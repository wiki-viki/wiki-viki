import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CommonButton from '.';

const meta = {
  title: 'Components/CommonButton',
  component: CommonButton,
  tags: ['autodocs'],
  args: {
    isActive: true,
  },
} as Meta<typeof CommonButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '버튼',
  },
};

export const Second: Story = {
  args: {
    variant: 'secondary',
    children: '버튼',
  },
  render: (args) => {
    return (
      <div className="center size-[200px] bg-green-50">
        <CommonButton {...args} className="border-red-500 text-red-500 hover:bg-red-200" />
      </div>
    );
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    const ButtonActive = () => {
      const [isActive, setIsActive] = useState(false);

      const handleActive = () => {
        setIsActive(!isActive);
      };

      return (
        <div className="center size-[300px] flex-col gap-4 bg-blue-50">
          <CommonButton variant="primary" isActive={isActive}>
            내 위키 만들기
          </CommonButton>
          <CommonButton variant="secondary" onClick={handleActive}>
            버튼 상태 변경하기
          </CommonButton>
        </div>
      );
    };
    return <ButtonActive />;
  },
};
