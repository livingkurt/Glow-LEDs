import { Box, Button, Container } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { formatDate, formatPrice } from "../../utils/helper_functions";
import { useGetGiftcardsQuery, useDeleteGiftcardMutation } from "../../api/giftcardApi";
import { Loading } from "../../shared/SharedComponents";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditGiftcardModal from "./components/EditGiftcardModal";
import { open_create_giftcard_modal, open_edit_giftcard_modal } from "../../slices/giftcardSlice";

const GiftcardsPage = () => {
  const dispatch = useDispatch();
  const { data: giftcards, isLoading } = useGetGiftcardsQuery();
  const [deleteGiftcard] = useDeleteGiftcardMutation();

  const handleDelete = async id => {
    try {
      await deleteGiftcard(id);
      dispatch(showSuccess({ message: "Gift card deleted successfully" }));
    } catch (error) {
      dispatch(showError({ message: error.message }));
    }
  };

  const columnDefs = [
    { title: "Code", display: giftcard => giftcard.code },
    { title: "Type", display: giftcard => giftcard.type },
    { title: "Initial Balance", display: giftcard => formatPrice(giftcard.initialBalance) },
    { title: "Current Balance", display: giftcard => formatPrice(giftcard.currentBalance) },
    { title: "Source", display: giftcard => giftcard.source },
    {
      title: "Expiration",
      display: giftcard => (giftcard.expirationDate ? formatDate(giftcard.expirationDate) : "Never"),
    },
    { title: "Status", display: giftcard => (giftcard.isActive ? "Active" : "Inactive") },
    {
      title: "Actions",
      nonSelectable: true,
      display: giftcard => (
        <Box display="flex" justifyContent="flex-end">
          <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_giftcard_modal(giftcard))}>
            <Edit />
          </GLIconButton>
          <GLIconButton tooltip="Delete" onClick={() => handleDelete(giftcard._id)}>
            <Delete />
          </GLIconButton>
        </Box>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth={false}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>{"Gift Cards"}</h1>
        <Button variant="contained" color="primary" onClick={() => dispatch(open_create_giftcard_modal())}>
          {"Create Gift Card"}
        </Button>
      </Box>

      <GLTableV2
        tableName="Gift Cards"
        namespaceScope="giftcards"
        searchPlaceholder="Search by code"
        namespace="giftcardTable"
        columnDefs={columnDefs}
        data={giftcards}
      />

      <EditGiftcardModal />
    </Container>
  );
};

export default GiftcardsPage;
