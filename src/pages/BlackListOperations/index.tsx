import { useState, useCallback, useEffect } from "react";
import BlackListFooter from "@/components/BlackList/Footer";
import { getBlackList, addOrUpdateBlackList } from "@/service/RmosApi";
import Table from "@/components/Table";
import { blackListTableHeaders } from "@/constants/Table";
import DeleteModal from "@/components/DeleteModal";
import BlackListAddOrUpdateModal from "@/components/BlackList/AddOrUpdateModal";
import { toast } from "react-toastify";
import { IBlackListAddOrUpdateForm, IBlackListTableData, IBlackListRow } from "@/types/BlackList";
import { IBlackListAddOrUpdateRequest } from "@/types/BlackList";
import { initializeBlackListAddOrUpdateForm } from "@/utils/blackList";
import { Button } from "@mui/material";

const BlackListOperations: React.FC = () => {
    const [blackList, setBlackList] = useState<IBlackListTableData[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addOrUpdateModalOpen, setAddOrUpdateModalOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
    const [addOrUpdateData, setAddOrUpdateData] = useState<IBlackListAddOrUpdateForm>(initializeBlackListAddOrUpdateForm());

    const fetchAndSetBlackList = useCallback(async () => {
        try {
            const request = {
                db_Id: "9",
                Adi: "ALL?",
            };

            const response = await getBlackList(request);
            const arrangedBlackList: IBlackListTableData[] = response.value.map((element: any) => ({ id: element.Id, ...element }));
            setBlackList(arrangedBlackList);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch and set blacklist:', error);
        }
    }, []);

    useEffect(() => {
        fetchAndSetBlackList();
    }, [fetchAndSetBlackList]);

    const handleDelete = (id: number) => {
        setSelectedDeleteId(id);
        setDeleteModalOpen(true);
    };

    const handleUpdate = (data: IBlackListRow) => {
        const { id, ...rest } = data;
        setAddOrUpdateData(rest);
        setAddOrUpdateModalOpen(true);
    };

    const handleAddNew = () => {
        setAddOrUpdateData(initializeBlackListAddOrUpdateForm());
        setAddOrUpdateModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedDeleteId !== null) {
            try {
                const updatedBlackList = blackList.filter(item => item.id !== selectedDeleteId);
                setBlackList(updatedBlackList);

                toast.success('Veri başarılı bir şekilde silindi.');
            } catch (error) {
                console.error('Veriyi silerken bir hata oluştu: ', error);
                toast.error('Veriyi silerken bir hata oluştu.');
            } finally {
                setDeleteModalOpen(false);
            }
        }
    };

    const confirmUpdate = async (updatedData: IBlackListAddOrUpdateForm) => {
        try {
            const request: IBlackListAddOrUpdateRequest = {
                db_Id: "9",
                ...updatedData
            };

            await addOrUpdateBlackList(request);
            await fetchAndSetBlackList();

            toast.success('Veri başarılı bir şekilde güncellendi.');
        } catch (error) {
            console.error('Veriyi güncellerken bir hata oluştu: ', error);
            toast.error('Veriyi güncellerken bir hata oluştu.');
        } finally {
            setAddOrUpdateModalOpen(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginTop: '1rem' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNew}
                >
                    Yeni Kayıt Ekle
                </Button>
            </div>
            <Table
                data={blackList}
                headers={blackListTableHeaders}
                loading={loading}
                disableColumnFilter={false}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
            <BlackListFooter />
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
            <BlackListAddOrUpdateModal
                open={addOrUpdateModalOpen}
                onClose={() => setAddOrUpdateModalOpen(false)}
                onConfirm={confirmUpdate}
                data={addOrUpdateData}
            />
        </>
    );
};

export default BlackListOperations;