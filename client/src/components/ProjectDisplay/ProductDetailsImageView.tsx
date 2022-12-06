import React, { useState } from "react";
import { Image } from "antd";

const ProductDetailsImageView = () => {
   const [visible, setVisible] = useState<boolean>(false);

   return (
      <>
         <Image
            preview={{ visible: false }}
            height={180}
            src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
            onClick={() => setVisible(true)}
         />
         <div style={{ display: "none" }}>
            <Image.PreviewGroup
               preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
            >
               <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
               <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
               <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            </Image.PreviewGroup>
         </div>
      </>
   );
};

export default ProductDetailsImageView;
