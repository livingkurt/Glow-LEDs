import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_category_modal, open_edit_category_modal } from "../../slices/categorySlice";
import { EditCategoryModal } from "./components";
import * as API from "../../api";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { determineCategoryColors } from "./categoryHelpers";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const CategorysPage = () => {
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { loading, remoteVersionRequirement } = categoryPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Name", display: "name" },
      { title: "Type", display: "type" },
      { title: "Pathname", display: "pathname" },
      { title: "Subcategories", display: row => row.subcategorys.map(subcategory => subcategory.name).join(" ,") },
      { title: "Collections", display: row => row.collections.map(collection => collection.name).join(" ,") },
      {
        title: "Actions",
        display: category => (
          <div className="jc-b">
            <GLIconButton
              variant="contained"
              tooltip="Edit"
              onClick={() => dispatch(open_edit_category_modal(category))}
            >
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton
              variant="contained"
              onClick={() => dispatch(API.deleteCategory(category._id))}
              tooltip="Delete"
            >
              <DeleteIcon color="white" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getCategorys(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Categorys | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"categorys/setRemoteVersionRequirement"}
        determineColor={determineCategoryColors}
        tableName={"Categorys"}
        namespaceScope="categorys"
        namespace="categoryTable"
        columnDefs={columnDefs}
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
