import { getTransactions } from "../../utils/covalent/Covalent";
import { Button } from "antd";
import { useState } from "react"

function ViewTransaction() {
    const [loading, setLoading] = useState();
    const [data, setData] = useState();

    const fetchHistory = async () => {

        setLoading(true);
        try {
            const res = await getTransactions("80001", "0x4D97F9Fc23Ce4B0be1F59d450B1acF550f18da5A");
            console.log(res);
            console.log(data)
            setData(res.data.data.items);
            console.log(data)
        } catch (e) {
            console.error(e);
            alert("error getting signdata" + e);
        } finally {
            setLoading(false);
        }
        console.log(data);
    }

    return (
        <div><Button onClick={fetchHistory} disabled={loading} loading={loading}>
            View transactions
        </Button>
            {/* {data[0]} */}
        </div>
    )
}

export default ViewTransaction