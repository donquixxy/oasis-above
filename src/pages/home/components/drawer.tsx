import {
  Button,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  ProgressCircle,
  Text,
} from "@chakra-ui/react";
import { ICart, useOrder } from "../hooks";
import { VCardMenu } from "../../../components/ui/card";
import { fmt } from "../../../utils/fmt";

interface IDrawerProps {
  isOpen: boolean;
  onClose: (v: boolean) => void;
  Data: ICart | undefined;
}

export function CartDrawer(props: IDrawerProps) {
  const { mutate, isPending } = useOrder();

  return (
    <div>
      <Drawer.Root
        open={props.isOpen}
        onOpenChange={(e) => {
          props.onClose(e.open);
        }}
        size={{ base: "sm", lg: "md", xl: "md" }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Cart</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                {props.Data
                  ? props.Data.items.map((val) => (
                      <VCardMenu
                        description={val.menu.description}
                        id={val.menu.id}
                        imageurl={val.menu.image_url}
                        name={val.menu.name}
                        price={val.menu.price}
                        cartQuantity={val.quantity}
                        subtotal={val.sub_total}
                      ></VCardMenu>
                    ))
                  : null}

                {props.Data && (
                  <>
                    <Flex marginTop={2} justifyContent="space-between">
                      <Text>Service 10%</Text>
                      <Text>{fmt.format(props.Data.service_amount)}</Text>
                    </Flex>

                    <Flex marginTop={2} justifyContent="space-between">
                      <Text>Tax 10%</Text>
                      <Text>{fmt.format(props.Data.tax_amount)}</Text>
                    </Flex>

                    <Flex marginTop={2} justifyContent="space-between">
                      <Text>Total</Text>
                      <Text>{fmt.format(props.Data.sub_total)}</Text>
                    </Flex>

                    <Flex justifyContent={"center"} marginTop={8}>
                      <Button
                        borderColor={"#9F8E68"}
                        variant={"outline"}
                        width="80%"
                        color={"#9F8E68"}
                        borderRadius={"14px"}
                        onClick={() => {
                          mutate(props.Data?.id!);
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
                            <>Place Order</>
                          )}
                        </div>
                      </Button>
                    </Flex>
                  </>
                )}
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="md" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
}
