#include "WelfareController.hpp"
#include "models/WelfareContributionModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response WelfareController::recordContribution(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::oid member(std::string(body["member"].s()));
    double amount = body["amount"].d();
    std::string contributionType = body["contributionType"].s();
    std::string paymentMethod = body["paymentMethod"].s();

    WelfareContribution new_contribution(member, amount, contributionType, paymentMethod);

    auto collection = db["welfarecontributions"];
    try {
        collection.insert_one(new_contribution.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Welfare contribution recorded successfully";
    return crow::response(201, res);
}

crow::response WelfareController::getAllContributions(const crow::request& req) {
    auto collection = db["welfarecontributions"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response WelfareController::getMemberContributions(const crow::request& req, const std::string& userId) {
    if (userId.empty()) {
        return crow::response(400, "User ID is required.");
    }

    auto collection = db["welfarecontributions"];
    auto cursor = collection.find(bsoncxx::builder::stream::document{} << "member" << bsoncxx::oid(userId) << bsoncxx::builder::stream::finalize);

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response WelfareController::getContributionById(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Contribution ID is required.");
    }

    auto collection = db["welfarecontributions"];
    auto contribution_doc = collection.find_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize);

    if (!contribution_doc) {
        return crow::response(404, "Contribution not found.");
    }

    return crow::response(200, bsoncxx::to_json(*contribution_doc));
}

crow::response WelfareController::updateContribution(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Contribution ID is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("amount")) update_doc << "amount" << body["amount"].d();
    if(body.has("contributionType")) update_doc << "contributionType" << body["contributionType"].s();
    if(body.has("paymentMethod")) update_doc << "paymentMethod" << body["paymentMethod"].s();

    auto collection = db["welfarecontributions"];
    auto result = collection.update_one(
        bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize,
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Contribution updated successfully.");
    } else {
        return crow::response(404, "Contribution not found or no changes made.");
    }
}

crow::response WelfareController::deleteContribution(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Contribution ID is required.");
    }

    auto collection = db["welfarecontributions"];
    auto result = collection.delete_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize);

    if (result && result->deleted_count() > 0) {
        return crow::response(200, "Contribution deleted successfully.");
    } else {
        return crow::response(404, "Contribution not found.");
    }
}
