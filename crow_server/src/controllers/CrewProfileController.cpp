#include "CrewProfileController.hpp"
#include "models/CrewProfileModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response CrewProfileController::createCrewProfile(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::oid user(std::string(body["user"].s()));
    std::string psvLicenseNumber = body["psvLicenseNumber"].s();
    std::string nationalId = body["nationalId"].s();
    std::string phoneNumber = body["phoneNumber"].s();

    CrewProfile new_crew_profile(user, psvLicenseNumber, nationalId, phoneNumber);

    auto collection = db["crewprofiles"];
    try {
        collection.insert_one(new_crew_profile.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Crew profile created successfully";
    return crow::response(201, res);
}

crow::response CrewProfileController::getAllCrewProfiles(const crow::request& req) {
    auto collection = db["crewprofiles"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response CrewProfileController::getCrewProfileByUserId(const crow::request& req, const std::string& userId) {
    if (userId.empty()) {
        return crow::response(400, "User ID is required.");
    }

    auto collection = db["crewprofiles"];
    auto crew_profile_doc = collection.find_one(bsoncxx::builder::stream::document{} << "user" << bsoncxx::oid(userId) << bsoncxx::builder::stream::finalize);

    if (!crew_profile_doc) {
        return crow::response(404, "Crew profile not found.");
    }

    return crow::response(200, bsoncxx::to_json(*crew_profile_doc));
}

crow::response CrewProfileController::updateCrewProfile(const crow::request& req, const std::string& userId) {
    if (userId.empty()) {
        return crow::response(400, "User ID is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("psvLicenseNumber")) update_doc << "psvLicenseNumber" << body["psvLicenseNumber"].s();
    if(body.has("nationalId")) update_doc << "nationalId" << body["nationalId"].s();
    if(body.has("phoneNumber")) update_doc << "phoneNumber" << body["phoneNumber"].s();

    auto collection = db["crewprofiles"];
    auto result = collection.update_one(
        bsoncxx::builder::stream::document{} << "user" << bsoncxx::oid(userId) << bsoncxx::builder::stream::finalize,
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Crew profile updated successfully.");
    } else {
        return crow::response(404, "Crew profile not found or no changes made.");
    }
}

crow::response CrewProfileController::deleteCrewProfile(const crow::request& req, const std::string& userId) {
    if (userId.empty()) {
        return crow::response(400, "User ID is required.");
    }

    auto collection = db["crewprofiles"];
    auto result = collection.delete_one(bsoncxx::builder::stream::document{} << "user" << bsoncxx::oid(userId) << bsoncxx::builder::stream::finalize);

    if (result && result->deleted_count() > 0) {
        return crow::response(200, "Crew profile deleted successfully.");
    } else {
        return crow::response(404, "Crew profile not found.");
    }
}
