#include "RouteController.hpp"
#include "models/RouteModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

crow::response RouteController::defineNewRoute(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    std::string routeName = body["routeName"].s();
    Location origin = {body["origin"]["latitude"].d(), body["origin"]["longitude"].d(), body["origin"]["address"].s()};
    Location destination = {body["destination"]["latitude"].d(), body["destination"]["longitude"].d(), body["destination"]["address"].s()};
    double estimatedDistance = body["estimatedDistance"].d();
    int estimatedDuration = body["estimatedDuration"].i();
    std::string routeType = body["routeType"].s();

    Route new_route(routeName, origin, destination, estimatedDistance, estimatedDuration, routeType);

    auto collection = db["routes"];
    try {
        collection.insert_one(new_route.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "Route created successfully";
    return crow::response(201, res);
}

crow::response RouteController::getAllRoutes(const crow::request& req) {
    auto collection = db["routes"];
    auto cursor = collection.find({});

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response RouteController::getRouteByIdOrName(const crow::request& req, const std::string& idOrName) {
    if (idOrName.empty()) {
        return crow::response(400, "Route ID or Name is required.");
    }

    auto collection = db["routes"];
    auto route_doc = collection.find_one(bsoncxx::builder::stream::document{} << "_id" << bsoncxx::oid(idOrName) << bsoncxx::builder::stream::finalize);

    if (!route_doc) {
        route_doc = collection.find_one(bsoncxx::builder::stream::document{} << "routeName" << idOrName << bsoncxx::builder::stream::finalize);
    }

    if (!route_doc) {
        return crow::response(404, "Route not found.");
    }

    return crow::response(200, bsoncxx::to_json(*route_doc));
}

crow::response RouteController::updateRoute(const crow::request& req, const std::string& idOrName) {
    if (idOrName.empty()) {
        return crow::response(400, "Route ID or Name is required.");
    }

    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::builder::stream::document update_doc{};
    if(body.has("routeName")) update_doc << "routeName" << body["routeName"].s();
    if(body.has("estimatedDistance")) update_doc << "estimatedDistance" << body["estimatedDistance"].d();
    if(body.has("estimatedDuration")) update_doc << "estimatedDuration" << body["estimatedDuration"].i();

    auto collection = db["routes"];

    bsoncxx::builder::stream::document filter{};
    try {
        filter << "_id" << bsoncxx::oid(idOrName);
    } catch (const std::exception& e) {
        filter << "routeName" << idOrName;
    }

    auto result = collection.update_one(
        filter.view(),
        bsoncxx::builder::stream::document{} << "$set" << update_doc.view() << bsoncxx::builder::stream::finalize
    );

    if (result && result->modified_count() > 0) {
        return crow::response(200, "Route updated successfully.");
    } else {
        return crow::response(404, "Route not found or no changes made.");
    }
}

crow::response RouteController::deleteRoute(const crow::request& req, const std::string& idOrName) {
    if (idOrName.empty()) {
        return crow::response(400, "Route ID or Name is required.");
    }

    auto collection = db["routes"];

    bsoncxx::builder::stream::document filter{};
    try {
        filter << "_id" << bsoncxx::oid(idOrName);
    } catch (const std::exception& e) {
        filter << "routeName" << idOrName;
    }

    auto result = collection.delete_one(filter.view());

    if (result && result->deleted_count() > 0) {
        return crow::response(200, "Route deleted successfully.");
    } else {
        return crow::response(404, "Route not found.");
    }
}
