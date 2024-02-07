import { useState } from "react";
import { Container, SimpleGrid, List, ThemeIcon, Input } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
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
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = basketItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  return (
    <Container>
      <SimpleGrid cols={3} className="Store">
        {storeItems.map(({ name, src }) => {
          return (
            <Card
              name={name}
              src={src}
              onAdd={() => setBasketItems([...basketItems, { name }])}
            />
          );
        })}
      </SimpleGrid>
      <Input.Wrapper label="Arama">
        <Input onChange={(e) => setSearchValue(e.target.value)} />
      </Input.Wrapper>
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
        {filteredItems.map(({ name }) => (
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
    </Container>
  );
}

export default App;
