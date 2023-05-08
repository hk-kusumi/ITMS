const Company = require("../models/Company");
const Undergraduate = require("../models/Undergraduate");
const handleErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const quickSortByWGPA = require('../utils/quickSortByWGPA');


// Method: POST
// Endpoint: "/create-company"
// Description: create a company
// User: Admin
module.exports.createCompany = catchAsync(async (req, res) => {
    try {
        const { name, email, contactNo, address, internSeats, description, connectedForIntern } = req.body;
        const company = await Company.create({ name, email, contactNo, address, internSeats, description, connectedForIntern });
        res.status(201).json({ company: company._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
});

// Method: POST
// Endpoint: "//:companyID/add-contact-person"
// Description: add a contact person for a company
// User: Admin
module.exports.addContactPerson = catchAsync(async (req, res) => {
    try {
        const contactPersonData = req.body;
        // Convert the request parameter "companyID" to a MongoDB ObjectID
        const id = mongoose.Types.ObjectId(req.params.companyID);

        Company.findByIdAndUpdate(
            id,
            { $push: { contactPerson: contactPersonData } },
            { new: true },
            (err, updatedCompany) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'An error occurred while updating the company' });
                }

                if (!updatedCompany) {
                    return res.status(404).json({ error: 'The company was not found' });
                }

                res.status(200).json({ message: 'The contact person was added successfully' });
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});

// Method: PATCH
// Endpoint: "/:companyID/edit-rating"
// Description: edit company ratings
// User: Admin, Alumni
module.exports.editCompanyRating = catchAsync(async (req, res) => {
    try {
        const companyID = req.params.companyID;
        console.log(companyID);
        const c = Company.find();
        console.log(c)
        // Company.findById(companyID, (err, foundCompany) => {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log(foundCompany);
        //     } 
        // }) 
    } catch (err) {
        console.log(err);
    }
});

// Method: GET
// Endpoint: "/intern-process-company-list"
// Description: View companies that select for intern application process
// User: Admin, Undergraduate
module.exports.internProcessCompanyList = catchAsync(async (req, res) => {
    try {
        const companyList = await Company.find({ connectedForIntern: true });

        if (companyList.length === 0) {
            return res.status(404).json({ message: "No any company for intern process" });
        }

        // res.status(200).json({companyList});
        res.status(200).json({
            status: "success",
            length: companyList.length,
            data: companyList
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process"
// Description: Create a intern lists
// User: Admin
module.exports.internProcess = catchAsync(async (req, res) => {
    try {
        const candidates = await Undergraduate.find().populate('companySelection01');
        const weightedGPAList = await quickSortByWGPA(candidates);

        for (let i = 0; i < weightedGPAList.length; i++) {

            const candidate = weightedGPAList[i];

            // check company slection is done by candidate // may be unnessasry
            if (!candidate.companySelection01) {
                console.log('user not enter company selection');
                continue;
            }

            //get company selections from candidate
            const company01 = await Company.findOne({ _id: candidate.companySelection01.companyId, connectedForIntern: true });
            const company02 = await Company.findOne({ _id: candidate.companySelection02.companyId, connectedForIntern: true });
            const company03 = await Company.findOne({ _id: candidate.companySelection03.companyId, connectedForIntern: true });

            console.log(company01, company02, company03);

            // check if company selections are available or not
            if (!company01 || !company02 || !company03) {
                console.log("Some company selections are not connected for internships");
                continue;
            }

            // check candidate for first selection
            if (company01.applicationList.length < company01.applicationListSize) {
                company01.applicationList.push({ candidate: candidate._id });
                company01.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                })
            }
            // check candidate for second selection
            else if (company02.applicationList.length < company02.applicationListSize) {
                company02.applicationList.push({ candidate: candidate._id });
                company02.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                })
            }
            // check candidate for third selection
            else if (company03.applicationList.length < company03.applicationListSize) {
                company03.applicationList.push({ candidate: candidate._id });
                company03.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                })
            } else {
                console.log("list full");
            }
        }
    } catch (err) {
        console.log(err);
    }
})


// Method: GET
// Endpoint: "/intern-process-company"
// Description: get companies that offer internships through university
// User: Admin, Undergraduate
module.exports.internProcessCompany = catchAsync(async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const company = await Company.findById(companyId);
        const users = await Undergraduate.find().select('name regNo gpa weightedGPA internStatus');

        if (!company) {
            return res.status(400).json({ message: "Can't find the company" });
        }
        console.log(company, users);
        res.status(200).json({ company, users });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/intern-process-company"
// Description: add candidates to the company list
// User: Admin
module.exports.updateCompanyInternApplicationList = catchAsync(async (req, res) => {
    try {
        const { companyId, candidateList } = req.body;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        candidateList.forEach((candidate) => {
            while (company.applicationListSize >= company.applicationList.length) {
                company.applicationList.push({ candidate: candidate.id })
            }
        })

        await company.save();

        res.status(201).json({ company });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process-student"
// Description: add candidate to the company list
// User: Admin
module.exports.addCandidateToApplicationList = catchAsync(async (req, res) => {
    try {
        const { companyId, candidateId } = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        const candidate = await Undergraduate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: "candidate not found" });
        }

        if (company.applicationList.length >= company.applicationListSize) {
            return res.status(400).json({ error: "company application list is full. " });
        }

        company.applicationList.push(candidate._id);
        await company.save();

        res.status(201).json({ company });
    } catch (err) {
        res.status(500).json(err);
    }
});