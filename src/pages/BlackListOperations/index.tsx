import { useState, useCallback, useEffect } from "react";
import BlackListFooter from "@/components/BlackList/Footer";
import { getBlackList } from "@/service/RmosApi";
import Table from "@/components/Table";
import { blackListTableHeaders } from "@/constants/Table";
import DeleteModal from "@/components/DeleteModal";
import UpdateModal from "@/components/BlackList/UpdateModal";

const BlackListOperations: React.FC = () => {
    const [blackList, setBlackList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedData, setSelectedData] = useState<any>(null);

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
        setSelectedId(id);
        setDeleteModalOpen(true);
    };

    const handleUpdate = (id: number) => {
        const data = blackList.find(item => item.id === id);
        if (data) {
            setSelectedData(data);
            setUpdateModalOpen(true);
        }
    };

    const confirmDelete = async () => {
        if (selectedId !== null) {
            console.log('Delete row with id:', selectedId);
            setDeleteModalOpen(false);
        }
    };

    const confirmUpdate = async (updatedData: any) => {
        console.log('Update row with data:', updatedData);
        setUpdateModalOpen(false);
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
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
            <UpdateModal
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onConfirm={confirmUpdate}
                initialData={selectedData || {}}
            />
        </>
    );
};

export default BlackListOperations;