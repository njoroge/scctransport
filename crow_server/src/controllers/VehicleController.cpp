#include "VehicleController.hpp"
#include "models/VehicleModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response VehicleController::registerVehicle(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    std::string numberPlate = body["numberPlate"].s();
    std::string vehicleType = body["vehicleType"].s();
    std::string logbookNumber = body["logbookNumber"].s();
    int passengerCapacity = body["passengerCapacity"].i();
    bsoncxx::oid owner(std::string(body["owner"].s()));

    Vehicle new_vehicle(numberPlate, vehicleType, logbookNumber, passengerCapacity, owner);

    auto collection = db["vehicles"];
    try {
        collection.insert_one(new_vehicle.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Vehicle registered successfully";
    return crow::response(201, res);
}

crow::response VehicleController::getAllVehicles(const crow::request& req) {
    auto collection = db["vehicles"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response VehicleController::getVehicleById(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Vehicle ID is required.");
    }

    auto collection = db["vehicles"];
    auto vehicle_doc = collection.find_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize);

    if (!vehicle_doc) {
        return crow::response(404, "Vehicle not found.");
    }

    return crow::response(200, bsoncxx::to_json(*vehicle_doc));
}

crow::response VehicleController::updateVehicle(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Vehicle ID is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("numberPlate")) update_doc << "numberPlate" << body["numberPlate"].s();
    if(body.has("vehicleType")) update_doc << "vehicleType" << body["vehicleType"].s();
    if(body.has("logbookNumber")) update_doc << "logbookNumber" << body["logbookNumber"].s();
    if(body.has("passengerCapacity")) update_doc << "passengerCapacity" << body["passengerCapacity"].i();
    if(body.has("owner")) update_doc << "owner" << bsoncxx::oid(std::string(body["owner"].s()));

    auto collection = db["vehicles"];
    auto result = collection.update_one(
        bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize,
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Vehicle updated successfully.");
    } else {
        return crow::response(404, "Vehicle not found or no changes made.");
    }
}

crow::response VehicleController::deleteVehicle(const crow::request& req, const std::string& id) {
    if (id.empty()) {
        return crow::response(400, "Vehicle ID is required.");
    }

    auto collection = db["vehicles"];
    auto result = collection.delete_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(id) << bsoncxx::builder::stream::finalize);

    if (result && result->deleted_count() > 0) {
        return crow::response(200, "Vehicle deleted successfully.");
    } else {
        return crow::response(404, "Vehicle not found.");
    }
}
