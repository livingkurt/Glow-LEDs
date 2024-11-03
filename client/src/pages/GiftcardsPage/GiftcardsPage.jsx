import { Box, Button, Container } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { formatDate, formatPrice } from "../../utils/helper_functions";
import { useGetGiftCardsQuery, useDeleteGiftCardMutation } from "../../api/giftCardApi";
import { Loading } from "../../shared/SharedComponents";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditGiftCardModal from "./components/EditGiftCardModal";
import { open_create_gift_card_modal, open_edit_gift_card_modal } from "../../slices/giftCardSlice";

const GiftCardsPage = () => {
  const dispatch = useDispatch();
  const { data: giftCards, isLoading } = useGetGiftCardsQuery();
  const [deleteGiftCard] = useDeleteGiftCardMutation();

  const handleDelete = async id => {
    try {
      await deleteGiftCard(id);
      dispatch(showSuccess({ message: "Gift card deleted successfully" }));
    } catch (error) {
      dispatch(showError({ message: error.message }));
    }
  };

  const columnDefs = [
    { title: "Code", display: giftCard => giftCard.code },
    { title: "Type", display: giftCard => giftCard.type },
    { title: "Initial Balance", display: giftCard => formatPrice(giftCard.initialBalance) },
    { title: "Current Balance", display: giftCard => formatPrice(giftCard.currentBalance) },
    { title: "Source", display: giftCard => giftCard.source },
    {
      title: "Expiration",
      display: giftCard => (giftCard.expirationDate ? formatDate(giftCard.expirationDate) : "Never"),
    },
    { title: "Status", display: giftCard => (giftCard.isActive ? "Active" : "Inactive") },
    {
      title: "Actions",
      nonSelectable: true,
      display: giftCard => (
        <Box display="flex" justifyContent="flex-end">
          <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_gift_card_modal(giftCard))}>
            <Edit />
          </GLIconButton>
          <GLIconButton tooltip="Delete" onClick={() => handleDelete(giftCard._id)}>
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
        <Button variant="contained" color="primary" onClick={() => dispatch(open_create_gift_card_modal())}>
          {"Create Gift Card"}
        </Button>
      </Box>

      <GLTableV2
        tableName="Gift Cards"
        namespaceScope="giftCards"
        searchPlaceholder="Search by code"
        namespace="giftCardTable"
        columnDefs={columnDefs}
        data={giftCards}
      />

      <EditGiftCardModal />
    </Container>
  );
};

export default GiftCardsPage;
