import Bootcamp from "../../models/Bootcamp.js"

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = async (req, res) => {
    const bootcamps = await Bootcamp.find();

    if (!bootcamps) {
        return res.status(404).json({ success: false });
    }

    res.status(200).json({success:true,data:bootcamps});
}

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOneBootcamp = async (req, res) => { 
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
}

// @desc    Add new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private/admin
export const addNewBootcamp = async (req, res) => { 
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
}

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private/Admin
export const updateOneBootcamp = async (req, res) => { }

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private/Admin
export const deleteOneBootcamp=async(req,res)=>{}