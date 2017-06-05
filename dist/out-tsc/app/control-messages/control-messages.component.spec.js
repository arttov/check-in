import { async, TestBed } from '@angular/core/testing';
import { ControlMessagesComponent } from './control-messages.component';
describe('ControlMessagesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ControlMessagesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ControlMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/var/www/html/check-in/src/app/control-messages/control-messages.component.spec.js.map