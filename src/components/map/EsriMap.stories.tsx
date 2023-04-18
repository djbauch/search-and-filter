/* eslint-disable */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EsriMap from "./EsriMap";
import Map from "@arcgis/core/Map";
export default {
  title: "Components/EsriMap",
  component: EsriMap,
  argTypes: {
    layersVisible: {
      name: "layersVisible",
      type: { name: "boolean", required: false },
      defaultValue: true,
    },
    map: Map,
    latitude: { type: { name: 'number', required: false }, defaultValue: 29.42 },
    longitude: { type: { name: 'number', required: false }, defaultValue: -98.49},
    altitude: { type: { name: 'number', required: false }, defaultValue: 1000 },
  },
} as ComponentMeta<typeof EsriMap>;

const Template: ComponentStory<typeof EsriMap> = (args) => (
  <EsriMap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  //layersVisible: true
}
