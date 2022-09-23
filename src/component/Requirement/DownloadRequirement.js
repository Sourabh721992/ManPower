import React, { Fragment, useState } from 'react'
import { utils, writeFile } from 'xlsx'
import { GetRequirementDownloadApi } from '../../utils/ApiFunctions'
import { getSexLabel, getStringTime, logger } from '../../utils/CommonList'
import { DownloadButton } from '../Controls/Buttons/IconButtons'

const DownloadRequirement = (props) => {

    const requirementCode = props.requirementId

    const [isLoading, setLoading] = useState(false)

    let workerHeaders = ['Name', 'Status', 'Age', 'Sex', 'Contact No', 'Date Of Birth',
    'Passport No', 'Passport Expiry', 'Aadhaar No', 'Reference', 'Address', 'Father Name', 'Spouse Name', 'Spouse Date of Birth',
    'Children', 'Police Station', 'Language', 'Religion', 'Remarks', 'Trade1', 'Trade2', 'Gulf Experience(Years)',
    'India Experience(Years)', 'Total Experience(Years)', 'Education', 'Video Link 1', 'Video Link 2', 'Video Link 3',
    'CV Link'];

    const createWorkerData = (workerData) => {
        if(workerData && workerData.length > 0){
            let finalData = []

            workerData.forEach(row => {
                let details = {
                    'Name': row.Name,
                    'Status': row.Status,
                    'Age': row.Age,
                    'Sex': getSexLabel(row.Sex),
                    'Contact No': row.CountryCode + row.ContactNo,
                    'Date Of Birth': row.DOB,
                    'Passport No': row.PassportNo,
                    'Passport Expiry': row.PassportExpy,
                    'Aadhaar No': row.AdharNo,
                    'Reference': row.Reference,
                    'Address': row.Address,
                    'Father Name': row.FatherName,
                    'Spouse Name': row.SpouseName,
                    'Spouse Date of Birth': row.SpouseDOB,
                    'Children': row.Children,
                    'Police Station': row.PoliceStation,
                    'Language': row.Language,
                    'Religion': row.Religion,
                    'Remarks': row.Remarks,
                    'Trade1': row.Trade1,
                    'Trade2': row.Trade2,
                    'Gulf Experience(Years)': row.GulfExpr,
                    'India Experience(Years)': row.IndiaExpr,
                    'Total Experience(Years)': row.TotalExpr,
                    'Education': row.Education,
                    'Video Link 1': row.VidLink1,
                    'Video Link 2': row.VidLink2,
                    'Video Link 3': row.VidLink3,
                    'CV Link': row.CVLink
                }

                finalData.push(details)
            });

            return finalData
        }
    }

    let requirementHeaders = [
        'Code', 'Client Name', 'Rating', 'Status', 'Supplier Remark', 'Buyer Remark', 'Trades', 'Workers Required', 'Salary',
        'Currency', 'Timing', 'Work Days', 'Food Provided', 'Accommodation Provided'
    ]

    const createRequirementData = (requirementData) => {
        if(requirementData && requirementData.Trades && requirementData.Trades.length > 0){
            let finalData = []

            requirementData.Trades.forEach((row, index) => {
                if(index > 0){
                    requirementData.Code = ""
                    requirementData.ClientName = ""
                    requirementData.Rating = ""
                    requirementData.Status = ""
                    requirementData.SupplierRemark = ""
                    requirementData.BuyerRemark = ""
                }
                let details = {
                    'Code': requirementData.Code,
                    'Client Name': requirementData.ClientName,
                    'Rating': requirementData.Rating,
                    'Status': requirementData.Status,
                    'Supplier Remark': requirementData.SupplierRemark ? requirementData.SupplierRemark : "" ,
                    'Buyer Remark': requirementData.BuyerRemark ? requirementData.BuyerRemark : "" ,
                    'Trades': row.TradeName,
                    'Workers Required': row.WorkerCount,
                    'Salary': row.MinSalary + " - " + row.MaxSalary,
                    'Currency': row.Currency,
                    'Timing': getStringTime(row.FromWH) + "-" + getStringTime(row.ToWh),
                    'Work Days': row.WorkingDays,
                    'Food Provided': row.IfFoodProvided ? "Yes" : "No",
                    'Accommodation Provided': row.IfAccProvided ? "Yes" : "No"
                }

                finalData.push(details)
            });

            return finalData
        }
    }

    const handleDownload = () => {
        if(requirementCode){
            setLoading(true)
            const body = {
                requirementCode: requirementCode
            }
            GetRequirementDownloadApi(body)
                .then((response) => {
                    setLoading(false)
                    if (response.Code === 1 && response.Message) {
                        let data = JSON.parse(response.Message)
                        logger.log({ data })

                        // workers info
                        let ws = utils.json_to_sheet(createWorkerData(data.WorkersInfo), { header: workerHeaders });
                        let rs = utils.json_to_sheet(createRequirementData(data.RequirementInfo), { header: requirementHeaders });
                        let wb = utils.book_new()
                        utils.book_append_sheet(wb, rs, "Requirement")
                        // add header
                        // utils.aoa_to_sheet(wb, workerHeaders);
                        utils.book_append_sheet(wb, ws, "Workers")
                        let exportFileName = `workbook_1.xls`;
                        writeFile(wb, exportFileName)
                    }
            }).catch(() => {
                setLoading(false)
            })
        }
        
    }

    return (
        <Fragment>
            <DownloadButton iconClassName='mb-1' btnText="Export" disabled={isLoading} onClickEvent={() => handleDownload()}/>
        </Fragment>
    )
}

export default DownloadRequirement