const {
  addVehiclee,
  getVehicleeById,
  getSingleVehiclee,
  updateVehiclee,
} = require("../services/vehicle.service");

async function addVehicle(req, res, next) {
  console.log(req.body);

  try {
    const AddedVehicle = await addVehiclee(req.body);

    // console.log(AddedVehicle.affectedRows)
    console.log(AddedVehicle);
    if (!addVehiclee) {
      return res.status(400).json({
        error: "Failed to add vehicle",
      });
    } else if (AddedVehicle > 0) {
      return res.status(200).json({ status: "Vehicle added successfully" });
    } else {
      return res.status(400).json({
        error: "vehicle not added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getVehicleById(req, res, next) {
  // console.log(req.query);

  try {
    const customerVehicle = await getVehicleeById(req.query);

    // console.log(SingleVehicle.length)

    if (customerVehicle.length < 1) {
      return res.status(400).json({
        error: "No Vehicle Added!",
      });
    } else {
      return res.status(200).json({
        status: "Vehicle found!!",
        customerVehicle: customerVehicle,
      });
    }
  } catch (error) {
    // console.log("kkk");
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getSingleVehicle(req, res, next) {
  try {
    const SingleVehicle = await getSingleVehiclee(req.params);

    // console.log(SingleVehicle)

    if (SingleVehicle.length < 1) {
      return res.status(400).json({
        error: "No Vehicle Found!",
      });
    } else {
      return res.status(200).json({
        status: "Vehicle found!!",
        SingleVehicle: SingleVehicle,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// Update vehicle information
const updateVehicle = async (req, res) => {
  try {
    const { vehicle_id } = req.params; // Extract vehicle ID from params
    const vehicleData = req.body; // Vehicle data to update

    // Call service to update vehicle details
    const result = await updateVehiclee(vehicle_id, vehicleData);

    if (result === "Vehicle not found") {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res
      .status(200)
      .json({ message: "Vehicle updated successfully"});
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addVehicle,
  getVehicleById,
  getSingleVehicle,
  updateVehicle,
};
