/**
 *    (c) Copyright 2016 NEC Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  describe('horizon.dashboard.container-infra.clusters.show-certificate.service', function() {

    var service, selected, magnum;

    function fakePromise() {
      return { success: angular.noop };
    }

    beforeEach(module('horizon.app.core'));
    beforeEach(module('horizon.framework'));
    beforeEach(module('horizon.dashboard.container-infra.clusters'));

    beforeEach(inject(function($injector) {
      service = $injector.get(
        'horizon.dashboard.container-infra.clusters.show-certificate.service');
      magnum = $injector.get('horizon.app.core.openstack-service-api.magnum');
      spyOn(magnum, 'showCertificate').and.callFake(fakePromise);
    }));

    it('should check the policy', function() {
      var allowed = service.allowed();
      expect(allowed).toBeTruthy();
    });

    it('should get magnum.showcertificate', function() {
      selected = {
        id: '1'
      };
      service.initAction();
      service.perform(selected);
      expect(magnum.showCertificate).toHaveBeenCalled();
    });
  });
})();
