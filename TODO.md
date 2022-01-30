# TODO

## Functionality
- Add config to show axis
- Find the closest object to mouse within X dist to highlight
- Improve Line/Point labeling to ungroup labels if they're too close together
- Create interface to create points
- Create interface to Create lines from 2 points or point&dir
- Create orto3d components (3d objects that have their projection counter
parts)
- Document drag logic
- Improve infinite line boundary calculation for mouse drag
- Orto3d:
  - Point
  - Line
  - Plane
  - Poligon?
- Intersection calculation

## UI
- Replace current sidebar with component list
- Only store (objectStore) serializable info about Points/Lines etc..
- Only store LABELED objects
- Consider moving entire ObjectManager state on update for 
consistency assurance
- Make sidebar collapsable
- Create right sidebar for editing/crating Objects (point position, ...)

## Long term
- Create 3d viewer
- Make orto_projection into react component ?