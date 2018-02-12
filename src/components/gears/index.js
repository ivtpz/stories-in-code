import gear1 from './Gear1';
import gear2 from './Gear2';
import gear3 from './Gear3';
import gear4 from './Gear4';
import gear5 from './Gear5';
import gear6 from './Gear6';
import logoGear from './LogoGear';

// Used for calculating rotation speed
gear1.spokes = 19;
gear1.direction = 1;
gear1.displayName = 'gear1';
gear2.spokes = 8;
gear2.direction = 1;
gear2.displayName = 'gear2';
gear3.spokes = 8;
gear3.direction = -1;
gear3.displayName = 'gear3';
gear4.spokes = 6;
gear4.direction = -1;
gear4.displayName = 'gear4';
gear5.spokes = 15;
gear5.direction = -1;
gear5.displayName = 'gear5';
gear6.spokes = 10;
gear6.direction = 1;
gear6.displayName = 'gear6';
logoGear.spokes = 12;
logoGear.direction = 1;
logoGear.displayName = 'logoGear';

export {
  gear1,
  gear2,
  gear3,
  gear4,
  gear5,
  gear6,
  logoGear
};
