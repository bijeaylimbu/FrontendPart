import EntryForm from "../Form/EntryForm";
import TransactionType from "../Form/TransactionType";

export default function HomePage() {
    return (
        <>
            <div>
                <div style={{ width: " 100%" }}>
                    <TransactionType />
                </div>
                <div>
                    <div style={{ width: "40%", float: "left", marginLeft: "5%", marginTop: "100px" }}>
                        <EntryForm />
                    </div>
                    <div style={{ width: "40%", float: "left", marginLeft: "5%" }}>
                        {/* <EntryForm /> */}
                    </div>
                </div>
            </div>
        </>
    );
}