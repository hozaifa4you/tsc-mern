import { Space } from "antd";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface IPropTypes {
   images: string[];
}

const DocumentDisplay: React.FC<IPropTypes> = ({ images }) => {
   console.log(images);

   return (
      <Space size={12}>
         <PhotoProvider>
            {images.map((x, i) => (
               <PhotoView key={i} src={x}>
                  <img
                     style={{
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #BDBDBD",
                        margin: "5px",
                     }}
                     width={110}
                     src={x}
                     alt="photos"
                  />
               </PhotoView>
            ))}
         </PhotoProvider>
      </Space>
   );
};

export default DocumentDisplay;
