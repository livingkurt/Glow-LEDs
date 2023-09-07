import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_category_modal, open_edit_category_modal } from "../../slices/categorySlice";
import { EditCategoryModal } from "./components";
import * as API from "../../api";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategorysPage = () => {
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { message, loading, remoteVersionRequirement } = categoryPage;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "Name", display: "name" },
      {
        title: "Actions",
        display: category => (
          <div className="jc-b">
            <IconButton
              variant="contained"
              aria-label="Edit"
              onClick={() => dispatch(open_edit_category_modal(category))}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              variant="contained"
              onClick={() => dispatch(API.deleteCategory(category.pathname))}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getCategorys(options), []);
  // const remoteReorderApi = useCallback(options => API.reorderCategorys(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Categorys | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        // remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"categorys/setRemoteVersionRequirement"}
        tableName={"Categorys"}
        namespaceScope="categorys"
        namespace="categoryTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_category_modal())}>
            Create Category
          </Button>
        }
      />
      <EditCategoryModal />
    </div>
  );
};
export default CategorysPage;
