import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Trainspotting','28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting','28 Days Later')
      }));
    });
  });

  describe('next', () => {
    it('takes next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting','28 Days Later','Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting','28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine','127 Hours','Millions','Slumdog')
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine','127 Hours')
        }),
        entries: List.of('Millions', 'Slumdog', 'Trainspotting')
      }));
    });

    it('puts both the tied votes back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 2,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine','127 Hours','Millions','Slumdog')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine','127 Hours')
        }),
        entries: List.of('Millions', 'Slumdog', 'Trainspotting', '28 Days Later')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting','Sunshine'),
          tally: Map({
            'Trainspotting': 4,
            'Sunshine': 2
          })
        }),
        entries: List()
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });

  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({pair: List.of('Trainspotting','28 Days Later')}),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting','28 Days Later'),
          tally: Map({'Trainspotting': 1})
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting','28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting','28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      }));
    });
  });

});
