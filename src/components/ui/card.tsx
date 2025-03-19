import {
  Button,
  Card,
  Image,
  Text,
  Box,
  ProgressCircle,
  Flex,
} from "@chakra-ui/react";
import { useCartMutation } from "../../pages/home/hooks";
import { useCookie } from "../../hooks/cookies";
import { Delete } from "@icon-park/react";
import { fmt } from "../../utils/fmt";

interface ICardProps {
  id: number;
  imageurl: string;
  name: string;
  description: string;
  price: number;
  cartQuantity?: number;
  subtotal?: number;
}

export default function CardMenu(props: ICardProps) {
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

export function VCardMenu(props: ICardProps) {
  const { mutate, isPending } = useCartMutation();

  const handleDelete = () => {
    mutate({
      menu_id: props.id,
      quantity: 0,
      session_id: "",
    });
  };

  const handleAdd = () => {
    mutate({
      menu_id: props.id,
      quantity: props.cartQuantity! + 1,
      session_id: "",
    });
  };

  const handleDecrease = () => {
    mutate({
      menu_id: props.id,
      quantity: props.cartQuantity! - 1,
      session_id: "",
    });
  };

  return (
    <Flex
      bg="#2E2E38"
      borderRadius="md"
      align="center"
      p={4}
      gap={10}
      justify="space-between"
      w="full"
      marginBottom={2}
    >
      {/* Image */}
      <Image
        src={props.imageurl}
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
      />

      {/* Title and Counter */}
      <Flex flexDir="column" flex="1">
        <Text fontWeight="bold" color="white">
          {props.name}
        </Text>
        <Flex align="center" mt={2}>
          <Button
            size="xs"
            bg="#9F8E68"
            color="white"
            _hover={{ bg: "#BFA878" }}
            disabled={isPending}
            onClick={handleDecrease}
          >
            {isPending ? (
              <ProgressCircle.Root value={null} size="xs">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            ) : (
              <p>-</p>
            )}
          </Button>
          <Text mx={2} color="white">
            {props.cartQuantity}
          </Text>
          <Button
            size="xs"
            bg="#9F8E68"
            color="white"
            _hover={{ bg: "#BFA878" }}
            disabled={isPending}
            onClick={handleAdd}
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
                <p>+</p>
              )}
            </div>
          </Button>
        </Flex>
      </Flex>

      <Flex gap={2} flexDir={"column"} flex={"1"} align={"end"}>
        <Delete
          className="icon"
          theme="outline"
          size="24"
          fill="#9F8E68"
          strokeWidth={2}
          onClick={handleDelete}
        />
        {/* Price */}
        <Text color="white" fontWeight="bold">
          {fmt.format(props.subtotal!)}
        </Text>
      </Flex>
    </Flex>
  );
}
