import { useState } from "react";
import {
  Container,
  SimpleGrid,
  List,
  ThemeIcon,
  Input,
  Button,
  Group,
  Drawer,
  Indicator,
  Badge,
} from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { ShoppingCart } from "tabler-icons-react";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    id: 101,
    name: "Kamera",
    src: "camera",
    price: "440",
  },
  {
    id: 102,
    name: "Klasik Saat",
    src: "classic watch",
    price: "800",
  },
  {
    id: 103,
    name: "Smart Saat",
    src: "smart watch",
    price: "560",
  },
  {
    id: 104,
    name: "Headset",
    src: "headset",
    price: "560",
  },
  {
    id: 105,
    name: "Sport Ayaqqabi",
    src: "sport shoes",
    price: "560",
  },
  {
    id: 106,
    name: "Gitara",
    src: "guitar",
    price: "560",
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id === id);
    if (basketIndex >= 0) {
      let _basketItem = [...basketItems];
      _basketItem[basketIndex].count += 1;
      setBasketItems(_basketItem);
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };

  return (
    <Container>
      <Group align="end">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="green" label={basketItems.length} inline size={22}>
          <ShoppingCart
            size={33}
            strokeWidth={2}
            color={"#00abfb"}
            onClick={() => setOpened(true)}
          >
            Sepet
          </ShoppingCart>
        </Indicator>
      </Group>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ id, name, src }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              onAdd={() => addToBasket({ id, name })}
            />
          );
        })}
      </SimpleGrid>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sepetim"
        Padding="sm"
        size="sm"
      >
        <List
          className="List"
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name, count }) => (
            <List.Item>
              <Group>
                <div>{name}</div> <Badge>{count}</Badge>
              </Group>
            </List.Item>
          ))}
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleDashed size={16} />
              </ThemeIcon>
            }
          >
            Submit a pull request once you are done
          </List.Item>
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
