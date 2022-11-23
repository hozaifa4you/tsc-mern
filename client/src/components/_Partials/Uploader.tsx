import { useState, FC, Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-hot-toast";

import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";
import { toastErrorStyle, toastWarningStyle } from "../../utils/toastStyling";
import { API } from "../../app/API";

const backend_origin: string = process.env.REACT_APP_BACKEND_URL!;

interface IDeleteResponse {
   success: true;
   message: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
   });

interface IUploader {
   fileList: UploadFile<any>[];
   setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
}

const Uploader: FC<IUploader> = ({ fileList, setFileList }) => {
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState("");
   const [previewTitle, setPreviewTitle] = useState("");
   const { token } = useAppSelector(selectLogin);

   const handleCancel = () => setPreviewOpen(false);

   const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(
         file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
      );
   };

   const handleChange: UploadProps["onChange"] = ({
      fileList: newFileList,
   }) => {
      setFileList(newFileList);
   };

   const removePhoto = async (file: UploadFile<any>) => {
      console.log(file);
      try {
         const filename = file.response[0].filename;
         const config = { headers: { authorization: `Bearer ${token}` } };
         const payload = { photo: filename };

         const { data } = await API.post<IDeleteResponse>(
            "/api/v1/projects/delete-photo/delete",
            payload,
            config
         );
         if (data.success) {
            toast.success(data.message, toastWarningStyle);
         }
      } catch (err: any) {
         let errMsg = err.response.data.message || err.message;
         toast.error(errMsg, toastErrorStyle);
         throw err;
      }
   };

   const uploadButton = (
      <div>
         <PlusOutlined />
         <div style={{ marginTop: 8 }}>Upload</div>
      </div>
   );
   return (
      <>
         <Upload
            multiple
            name="project"
            action={`${backend_origin}/api/v1/projects/project-photos/upload`}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            accept="image/*,application/pdf"
            beforeUpload={(file) => {
               if (
                  file.type !==
                  ("image/png" ||
                     "image/jpg" ||
                     "image/jpeg" ||
                     "application/pdf")
               ) {
                  return toast.error(
                     "Only jpeg, jpg, png or pdf allowed! 🥵😒",
                     toastErrorStyle
                  );
               } else return true;
            }}
            headers={{
               authorization: `Bearer ${token}`,
            }}
            maxCount={5}
            onRemove={removePhoto}
         >
            {fileList.length >= 8 ? null : uploadButton}
         </Upload>
         <Modal
            open={previewOpen}
            title={previewTitle}
            footer={true}
            onCancel={handleCancel}
         >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
         </Modal>
      </>
   );
};

export default Uploader;
