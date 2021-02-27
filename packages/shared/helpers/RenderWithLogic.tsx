import { Canvas, SourceState } from '@storybook/addon-docs/blocks';


export const RenderWithLogic = ({ render }) => {
	return <Canvas withSource={SourceState.NONE}>{render()}</Canvas>;
}
