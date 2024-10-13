import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture />', () => {
  const pokemonId: number = 1;
  const imgSource: String =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';
  test('Should render the hidden image when showPokemon props is false', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: pokemonId,
        showPokemon: false,
      },
    });
    const img = wrapper.find('img');
    const attr = img.attributes();
    expect(img.exists()).toBeTruthy();
    expect(attr).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: `${imgSource}/${pokemonId}.svg`,
      }),
    );
  });
  test('Should render the image when showPokemon props is true', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: true,
      },
    });
    const img = wrapper.find('img');
    const attr = img.attributes();
    expect(img.exists()).toBeTruthy();
    expect(attr).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: `${imgSource}/${pokemonId}.svg`,
      }),
    );
  });
});
