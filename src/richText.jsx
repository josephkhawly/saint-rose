import React from "react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function getAllForAssetID(id, assets) {
  return assets.find(asset => asset.id === id);
}

function image(node, assets) {
  const id = node.data.target.sys.id;
  const imageObject = getAllForAssetID(id, assets);

  return (
    <div className="rich-text-image-container">
      <img src={imageObject.url}></img>
    </div>
  );
}

export function generateOptions(assets) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return image(node, assets);
      },
      [INLINES.HYPERLINK]: (node) => {
        return <a href={node.data.uri} target={'_blank'}>{node.content[0].value}</a>;
      }
    }
  };

  return options;
}
