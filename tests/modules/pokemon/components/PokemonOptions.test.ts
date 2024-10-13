import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import type { Pokemon } from '@/modules/pokemon/interfaces';
import { mount } from '@vue/test-utils';

const options: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
  },
  {
    id: 2,
    name: 'Ivysaur',
  },
  {
    id: 3,
    name: 'Venusaur',
  },
];

describe('<PokemonOptions />', () => {
  test('Should render buttons w/ correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        blockSelection: false,
        correctAnswer: options[1],
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((b, index) => {
      expect(b.text()).toBe(options[index].name);
      expect(b.attributes('class')).toBe('option');
    });
  });

  test('Should emit selectedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        blockSelection: false,
        correctAnswer: options[1],
      },
    });

    const [b1, b2, b3] = wrapper.findAll('button');

    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');

    expect(wrapper.emitted('selectedOption')).toBeTruthy();
    expect(wrapper.emitted().selectedOption[0]).toEqual([1]);
    expect(wrapper.emitted().selectedOption[1]).toEqual([2]);
    expect(wrapper.emitted().selectedOption[2]).toEqual([3]);
  });

  test('Should disabled buttons when blockSelection prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        blockSelection: true,
        correctAnswer: options[1],
      },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((b) => {
      const attr = Object.keys(b.attributes());
      expect(attr).toContain('disabled');
    });
  });

  test('Should apply correct styling to buttons based on correct/incorrect answer', () => {
    const correctAnswer = 1;
    const wrapper = mount(PokemonOptions, {
      props: {
        options,
        blockSelection: true,
        correctAnswer: options[correctAnswer - 1],
      },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
    });
  });
});
