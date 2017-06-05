import { async, TestBed } from '@angular/core/testing';
import { GoogleMapComponent } from './google-map.component';
describe('GoogleMapComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GoogleMapComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GoogleMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/var/www/html/check-in/src/app/google-map/google-map.component.spec.js.map