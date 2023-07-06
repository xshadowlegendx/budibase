import Router from "@koa/router"
import * as controller from "../../controllers/global/license"
import { middleware } from "@budibase/backend-core"
import Joi from "joi"

const activateLicenseKeyValidator = middleware.joiValidator.body(Joi.object({
    licenseKey: Joi.string().required(),
  }).required())

const activateOfflineLicenseValidator = middleware.joiValidator.body(Joi.object({
    offlineLicense: Joi.string().required(),
  }).required())

const router: Router = new Router()

router
  .post("/api/global/license/refresh", controller.refresh)
  .get("/api/global/license/usage", controller.getQuotaUsage)
  // LICENSE KEY
  .post("/api/global/license/key", activateLicenseKeyValidator, controller.activateLicenseKey)
  .get("/api/global/license/key", controller.getLicenseKey)
  .delete("/api/global/license/key", controller.deleteLicenseKey)
  // OFFLINE LICENSE
  .post("/api/global/license/offline", activateOfflineLicenseValidator, controller.activateOfflineLicense)
  .get("/api/global/license/offline", controller.getOfflineLicense)
  .delete("/api/global/license/offline", controller.deleteOfflineLicense)

export default router
