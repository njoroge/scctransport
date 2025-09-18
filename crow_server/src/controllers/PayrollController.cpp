#include "PayrollController.hpp"
#include "models/PayrollRecordModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response PayrollController::createPayrollRecord(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::oid crewMember(std::string(body["crewMember"].s()));
    std::string payPeriodStartDate = body["payPeriodStartDate"].s();
    std::string payPeriodEndDate = body["payPeriodEndDate"].s();
    std::vector<Earning> earnings;
    for (const auto& earning : body["earnings"].lo()) {
        earnings.push_back({earning["type"].s(), earning["amount"].d(), earning["description"].s()});
    }

    PayrollRecord new_record(crewMember, payPeriodStartDate, payPeriodEndDate, earnings);

    auto collection = db["payrollrecords"];
    try {
        collection.insert_one(new_record.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Payroll record created successfully";
    return crow::response(201, res);
}

crow::response PayrollController::getAllPayrollRecords(const crow::request& req) {
    auto collection = db["payrollrecords"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response PayrollController::getCrewMemberPayrollRecords(const crow::request& req, const std::string& userId) {
    if (userId.empty()) {
        return crow::response(400, "User ID is required.");
    }

    auto collection = db["payrollrecords"];
    auto cursor = collection.find(bsoncxx::builder::stream::document{} << "crewMember" << bsoncxx::oid(userId) << bsoncxx::builder::stream::finalize);

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response PayrollController::getPayrollRecordById(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Payroll record ID is required.");
    }

    auto collection = db["payrollrecords"];
    auto record_doc = collection.find_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize);

    if (!record_doc) {
        return crow::response(404, "Payroll record not found.");
    }

    return crow::response(200, bsoncxx::to_json(*record_doc));
}

crow::response PayrollController::updatePayrollRecord(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Payroll record ID is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("status")) update_doc << "status" << body["status"].s();
    if(body.has("notes")) update_doc << "notes" << body["notes"].s();

    auto collection = db["payrollrecords"];
    auto result = collection.update_one(
        bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize,
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Payroll record updated successfully.");
    } else {
        return crow::response(404, "Payroll record not found or no changes made.");
    }
}
