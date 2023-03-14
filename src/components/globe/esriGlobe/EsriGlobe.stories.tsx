/* eslint-disable */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EsriGlobe from "./EsriGlobe";
import Map from "@arcgis/core/Map";
export default {
  title: "Components/EsriGlobe",
  component: EsriGlobe,
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
} as ComponentMeta<typeof EsriGlobe>;

const Template: ComponentStory<typeof EsriGlobe> = (args) => (
  <EsriGlobe {...args} />
);

export const Default = Template.bind({});
Default.args = {
  layersVisible: true
}
