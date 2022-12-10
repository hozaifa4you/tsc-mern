import React, { useState } from "react";
import { Button, Image, Space } from "antd";

const DocumentDisplay: React.FC = () => {
   const [random, setRandom] = useState<number>();

   return (
      <Space size={12}>
         <Image.PreviewGroup>
            <Image
               width={80}
               src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
               loading="lazy"
            />
            <Image
               width={80}
               src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
               loading="lazy"
            />
         </Image.PreviewGroup>
      </Space>
   );
};

export default DocumentDisplay;
