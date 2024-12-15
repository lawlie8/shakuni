import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../JobSlice";

export default function NewJobs({ params }) {

    const isModalOpen = useSelector(state => state.jobStore.isModalOpen)
    const dispatch = useDispatch();


    const handleOk = () => {
        dispatch(setIsModalOpen(false));
    };

    const handleCancel = () => {
        dispatch(setIsModalOpen(false));
    };

    return <div className="new-job-modal">
        <Modal title="Create New Job" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        </Modal>
    </div>
}