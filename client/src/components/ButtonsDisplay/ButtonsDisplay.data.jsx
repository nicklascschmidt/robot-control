import * as RSC from '../../constants/robotStateConstants';
import * as RAC from '../../constants/robotActionConstants';

export const buttonOptionsByRobotState = {
  [RSC.IDLE]: [RAC.START, RAC.REPAIR],
  [RSC.PICKING]: [RAC.PLACE, RAC.REPAIR],
  [RSC.PLACING]: [RAC.DONE, RAC.RESET, RAC.REPAIR],
  [RSC.REPAIRING]: [RAC.RESET],
  [RSC.FAILED]: [RAC.RESET, RAC.REPAIR],
};
