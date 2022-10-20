import axiosInstance from "../utils/helpers/axiosInstance";

class entryService{
    // debitOrCreditEntryService(){
    //     return axiosInstance.post("",{
            
    //     })
    // }
    getAllVoucher(){
        return axiosInstance.get("/get-all-voucher");
    }

    getLedgerByVoucher(){
        return axiosInstance.get(`/get-ledger-by-voucher/${window.sessionStorage.getItem("voucherId")}`)
    }
}

export default new entryService();