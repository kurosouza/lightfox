'use strict';

import {observable, reaction, autorun} from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class MessageStore {

	@observable messages = [];

	constructor() {
		
	}

}

export default new MessageStore();
