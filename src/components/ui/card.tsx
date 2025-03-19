import {
  Button,
  Card,
  Image,
  Text,
  Box,
  ProgressCircle,
} from "@chakra-ui/react";
import { useCartMutation } from "../../pages/home/hooks";
import { useCookie } from "../../hooks/cookies";

interface ICardProps {
  id: number;
  imageurl: string;
  name: string;
  description: string;
  price: number;
}

export default function CardMenu(props: ICardProps) {
  const fmt = Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    useGrouping: true,
  });

  const { isPending, mutate } = useCartMutation();
  const session = useCookie();

  return (
    <Card.Root
      maxW={{ base: "300px", md: "md", lg: "lg", xl: "auto" }}
      flexDirection="column"
      className="text-poppins"
      overflow="hidden"
    >
      <Image
        height={{ base: "280px", md: "350", lg: "400px" }}
        src={props.imageurl}
        alt={props.name}
        crossOrigin="anonymous"
        loading="lazy"
      />
      <Card.Body
        padding={"20px"}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Card.Title>{props.name}</Card.Title>
        <Box flex="1" overflow="hidden">
          <Card.Description>{props.description}</Card.Description>
        </Box>
        <br></br>
        <Text>{fmt.format(props.price)}</Text>
      </Card.Body>

      <Card.Footer display="flex" justifyContent="center" mt="auto">
        <Button
          borderColor={"#9F8E68"}
          variant={"outline"}
          width="80%"
          color={"#9F8E68"}
          borderRadius={"14px"}
          onClick={() => {
            mutate({
              menu_id: props.id,
              quantity: 1,
              session_id: session.getSessionID,
            });
          }}
        >
          <div>
            {isPending ? (
              <ProgressCircle.Root value={null} size="xs">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            ) : (
              <p>Add To Cart</p>
            )}
          </div>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
