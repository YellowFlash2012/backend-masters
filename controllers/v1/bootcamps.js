// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = async (req, res) => {
    res.send('get all bootcamps')
}

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOneBootcamp = async (req, res) => { }

// @desc    Add new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private/admin
export const addNewBootcamp = async (req, res) => { }

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private/Admin
export const updateOneBootcamp = async (req, res) => { }

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private/Admin
export const deleteOneBootcamp=async(req,res)=>{}