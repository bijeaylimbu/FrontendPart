import axiosInstance from "../utils/helpers/axiosInstance";

class entryService {
    // debitOrCreditEntryService(){
    //     return axiosInstance.post("",{

    //     })
    // }
    getAllVoucher() {
        return axiosInstance.get("/get-all-voucher");
    }

    getLedgerByVoucher() {
        return axiosInstance.get(`/get-ledger-by-voucher/${window.sessionStorage.getItem("voucherId")}`)
    }

    addEntry(type, subType, amount, entryDate) {
        return axiosInstance.post('/add-entry', {
                type: type,
                subType: subType,
                amount: parseFloat(amount),
                entryDate: entryDate
        }).then(res=>window.sessionStorage.setItem("entryId", res.data))
    }
    addEntryWithId(type, subType, amount, entryDate, entryId) {
        return axiosInstance.post('/add-entry', {
                type: type,
                subType: subType,
                amount: parseFloat(amount),
                entryDate: entryDate,
                entryId: entryId
        })
    }

    getAllEntry(id){
            return axiosInstance.get(`/all-entry/${id}`);
    }

    getTotalDebitAndCreditAmount(id){
            return axiosInstance.get(`/get-entry-by-id/${id}`)
    }

    finalTransaction(debitTotalAmount, creditTotalAmount, voucherId){
        return axiosInstance.post('add-tran-entry',{
            debitTotalAmount:debitTotalAmount,
            creditTotalAmount: creditTotalAmount,
            voucherId: voucherId
        })
    }

    updateEntry(id,updatedType, subType, amount){
        console.log(updatedType)
        return axiosInstance.put(`/update-entry/${id}`,{
            type: updatedType,
            subType:  subType,
            amount:  parseFloat (amount)
        })
    }
}

export default new entryService();