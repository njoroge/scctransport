#include "EmployeeController.hpp"
#include "models/UserModel.hpp"
#include "models/CrewProfileModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response EmployeeController::createEmployee(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    std::string name = body["name"].s();
    std::string email = body["email"].s();
    std::string password = body["password"].s();
    std::string role = body["role"].s();
    std::string phoneNumber = body["phoneNumber"].s();

    User new_user(name, email, password, role, "", phoneNumber);

    auto users_collection = db["users"];
    auto crew_profiles_collection = db["crewprofiles"];

    try {
        auto result = users_collection.insert_one(new_user.to_bson());
        if (result) {
            bsoncxx::oid user_id = result->inserted_id().get_oid().value;
            CrewProfile new_crew_profile(user_id, "", "", "");
            crew_profiles_collection.insert_one(new_crew_profile.to_bson());
        }
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Employee created successfully";
    return crow::response(201, res);
}

crow::response EmployeeController::getEmployees(const crow::request& req) {
    auto collection = db["users"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response EmployeeController::updateEmployee(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Employee ID is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("name")) update_doc << "name" << body["name"].s();
    if(body.has("email")) update_doc << "email" << body["email"].s();
    if(body.has("role")) update_doc << "role" << body["role"].s();
    if(body.has("phoneNumber")) update_doc << "phoneNumber" << body["phoneNumber"].s();

    auto collection = db["users"];
    auto result = collection.update_one(
        bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize,
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Employee updated successfully.");
    } else {
        return crow::response(404, "Employee not found or no changes made.");
    }
}
