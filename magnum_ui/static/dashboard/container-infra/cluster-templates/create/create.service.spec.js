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

  describe('horizon.dashboard.container-infra.cluster-templates.create.service', function() {

    var service, $scope, $q, deferred, magnum, workflow;
    var model = {
      tabs: "",
      keypair_id: "",
      coe: null
    };
    var modal = {
      open: function(config) {
        config.model = model;
        deferred = $q.defer();
        deferred.resolve(config);
        return deferred.promise;
      }
    };

    ///////////////////

    beforeEach(module('horizon.app.core'));
    beforeEach(module('horizon.framework'));
    beforeEach(module('horizon.dashboard.container-infra.cluster-templates'));

    beforeEach(module(function($provide) {
      $provide.value('horizon.framework.widgets.form.ModalFormService', modal);
    }));

    beforeEach(inject(function($injector, _$rootScope_, _$q_) {
      $q = _$q_;
      $scope = _$rootScope_.$new();
      service = $injector.get(
        'horizon.dashboard.container-infra.cluster-templates.create.service');
      magnum = $injector.get('horizon.app.core.openstack-service-api.magnum');
      workflow = $injector.get(
        'horizon.dashboard.container-infra.cluster-templates.workflow');
      deferred = $q.defer();
      deferred.resolve({data: {uuid: 1}});
      spyOn(magnum, 'createClusterTemplate').and.returnValue(deferred.promise);
      spyOn(modal, 'open').and.callThrough();
      spyOn(workflow, 'init').and.returnValue({model: model});
    }));

    it('should check the policy if the user is allowed to create cluster template', function() {
      var allowed = service.allowed();
      expect(allowed).toBeTruthy();
    });

    it('open the modal', inject(function($timeout) {
      service.perform();

      expect(modal.open).toHaveBeenCalled();

      $timeout.flush();
      $scope.$apply();

      expect(magnum.createClusterTemplate).toHaveBeenCalled();
    }));
  });
})();
