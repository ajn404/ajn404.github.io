import { Workspace, Schema } from "@blocksuite/store";
import { useEffect } from "react";
import { AffineSchemas } from "@blocksuite/blocks/models";

export default () => {
  useEffect(() => {
    const schema = new Schema();
    // We can register a batch of blocks to the workspace
    schema.register(AffineSchemas);

    const workspace = new Workspace({ id: "foo", schema });
    console.log(workspace);
  });
  return <></>;
};
