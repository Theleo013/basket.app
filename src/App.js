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
} from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { ShoppingCart } from "tabler-icons-react";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    name: "Kamera",
    src: "camera",
    price: "440",
  },
  {
    name: "Klasik Saat",
    src: "classic watch",
    price: "800",
  },
  {
    name: "Smart Saat",
    src: "smart watch",
    price: "560",
  },
  {
    name: "Headset",
    src: "headset",
    price: "560",
  },
  {
    name: "Sport Ayaqqabi",
    src: "sport shoes",
    price: "560",
  },
  {
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
        {filteredItems.map(({ name, src }) => {
          return (
            <Card
              name={name}
              src={src}
              onAdd={() => setBasketItems([...basketItems, { name }])}
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
          {basketItems.map(({ name }) => (
            <List.Item>{name}</List.Item>
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
