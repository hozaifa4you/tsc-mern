import { useState, FC } from "react";
import { Image } from "antd";

import { IPhotos } from "../../pages/SingleProjectDisplay";

interface IPropTypes {
   photos?: IPhotos[];
}

const ProductDetailsImageView: FC<IPropTypes> = ({ photos }) => {
   const [visible, setVisible] = useState<boolean>(false);

   return (
      <>
         {photos && (
            <>
               <Image
                  preview={{ visible: false }}
                  height={180}
                  src={photos[0].url}
                  onClick={() => setVisible(true)}
               />
               <div style={{ display: "none" }}>
                  <Image.PreviewGroup
                     preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                     }}
                  >
                     {photos.map((photo, i) => (
                        <Image src={photo.url} key={i} />
                     ))}
                  </Image.PreviewGroup>
               </div>
            </>
         )}
      </>
   );
};

export default ProductDetailsImageView;
