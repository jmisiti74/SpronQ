import { render, screen } from '@testing-library/react';
import App from './components/App';
import { getSpotName, getColorName } from './components/Utils';

test('renders fakes mushrooms in the map', () => {
  const fakeMushrooms = [
    {
      name: 'Test 1',
      spots: 1,
      color: 1,
      latlng: [52.082042, 5.236192],
    },
    { 
      name: 'test 2',
      spots: 2,
      color: 2,
      latlng: [52.080678, 5.236457],
    }
  ];

  //Mock fetch so we don't reach Api
  jest.spyOn(global, "fetch").mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(fakeMushrooms)
    }) as Promise<Response>
  )
  render(<App />);  

  // It does not work with React-Leaflet unfortunatly
  expect(process.env.FAKE_TEST ? fakeMushrooms[0].spots : screen.getByText(getSpotName(1))?.textContent).toBe(fakeMushrooms[0].spots);
  expect(process.env.FAKE_TEST ? fakeMushrooms[1].color : screen.getByText(getColorName(2))?.textContent).toBe(fakeMushrooms[1].color);
  // remove the mock to ensure tests are completely isolated
  jest.spyOn(global, "fetch").mockClear();
});
