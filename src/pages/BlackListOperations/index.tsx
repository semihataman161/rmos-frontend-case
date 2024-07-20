import { useState, useCallback, useEffect } from "react";
import BlackListFooter from "@/components/BlackListFooter"
import { getBlackList } from "@/service/RmosApi";
import Table from "@/components/Table";
import { blackListTableHeaders } from "@/constants/Table";

const BlackListOperations: React.FC = () => {
    const [blackList, setBlackList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAndSetBlackList = useCallback(async () => {
        try {
            const request = {
                db_Id: "9",
                Adi: "ALL?",
            };

            const response = await getBlackList(request);
            const arrangedBlackList = response.value.map((element: any) => ({ id: element.Id, ...element }));
            setBlackList(arrangedBlackList);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch and set reservation:', error);
        }
    }, []);

    useEffect(() => {
        fetchAndSetBlackList();
    }, [fetchAndSetBlackList]);

    const handleDelete = (id: number) => {
        // setRows(rows.filter(row => row.id !== id));
        console.log('Delete row with id:', id);
    };

    const handleUpdate = (id: number) => {
        console.log('Update row with id:', id);
    };

    return (
        <>
            <Table
                data={blackList}
                headers={blackListTableHeaders}
                loading={loading}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
            <BlackListFooter />
        </>
    );
};

export default BlackListOperations;