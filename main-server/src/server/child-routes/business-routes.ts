import { Router, Request, Response } from "express";
import { BusinessServerApis } from "../../child-server-apis";
import { ApiAuthorization } from "../../api-authorization";
import { AuthenticatedRequest, authMiddleware } from "../../middleware/auth-middleware";
import { BusinessType, ServerMessage } from "common-model";
import { Role } from "common-model/model/teammember";

export function businessRoutes(
  router: Router,
  businessServerApis: BusinessServerApis,
  apiAuthorization: ApiAuthorization
) {
  router.post("/createBusiness", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req;
      const businessName: string = req.body.businessName;
      const businessType: BusinessType = req.body.businessType as BusinessType;

      if(businessName && businessType) {
        const response = await businessServerApis.createBusiness(getRequestId(req), businessName, id, businessType);
        res.status(response.status).send(response.data);
      }else {
        res.status(402).send(ServerMessage.PARAMETER_MISSING);
      }
    } catch (error) {
      res.status(500).send(ServerMessage.INTERNAL_SERVER_ERROR);
    }
  });


  // this is both authenticated and authorized route

  router.post("/addTeammember", authMiddleware, async(req:AuthenticatedRequest, res:Response)=>{
    try {
        const {id} = req;
        console.log("here",id);
        const teammeberEmail:string = req.body.teammemberEmail;
        const businessid:string = req.body.businessid;
        const teammemberRole: Role = req.body.teammeberRole as Role;

        if(businessid && teammeberEmail){
            const isAuthorized = await apiAuthorization.addTeammember(getRequestId(req), id, businessid);
            console.log("hjhj",isAuthorized)
            if(isAuthorized){
                const response = await businessServerApis.addTeammember(getRequestId(req), teammeberEmail, teammemberRole, businessid);
                res.status(response.status).send(response.data);
            }else {
                res.status(401).send(ServerMessage.NOT_AUTHORIZED);
            }
        }else {
            res.status(402).send(ServerMessage.PARAMETER_MISSING);
        }
    } catch (error) {
      res.status(500).send(ServerMessage.INTERNAL_SERVER_ERROR);
    }
  })

}

function getRequestId(req: any){
    return req.id;
}
