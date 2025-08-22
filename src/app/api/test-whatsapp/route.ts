import { NextRequest, NextResponse } from 'next/server';
import { MasterTestSuite } from '@/lib/test-runner/master-test-suite';

export async function GET(request: NextRequest) {
  console.log('🧪 WhatsApp Test API called');
  
  try {
    const { searchParams } = new URL(request.url);
    const suiteParam = searchParams.get('suite');
    const verbose = searchParams.get('verbose') === 'true';
    const format = searchParams.get('format') || 'json';
    
    const masterSuite = new MasterTestSuite();
    let report;
    
    // Run specific test suite based on parameter
    switch (suiteParam) {
      case 'functional':
        console.log('🎯 Running Functional Tests Only');
        report = await masterSuite.runFunctionalTestsOnly();
        break;
        
      case 'security':
        console.log('🔒 Running Security Tests Only');
        report = await masterSuite.runSecurityTestsOnly();
        break;
        
      case 'critical':
        console.log('⚡ Running Critical Tests Only');
        report = await masterSuite.runCriticalTestsOnly();
        break;
        
      default:
        console.log('🚀 Running All Tests');
        report = await masterSuite.runAllTests({ verbose });
        break;
    }
    
    // Return in requested format
    if (format === 'csv') {
      const csvData = masterSuite.exportReportCSV(report);
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="whatsapp-test-report-${report.runId}.csv"`
        }
      });
    }
    
    // Default JSON response
    return NextResponse.json({
      success: true,
      report,
      summary: {
        runId: report.runId,
        totalTests: report.overallSummary.totalTests,
        passRate: report.overallSummary.overallPassRate,
        duration: `${(report.totalDuration / 1000).toFixed(2)}s`,
        recommendations: report.recommendations
      }
    });
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Test execution failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// POST endpoint for running specific test configurations
export async function POST(request: NextRequest) {
  console.log('🧪 WhatsApp Custom Test Configuration');
  
  try {
    const body = await request.json();
    const {
      includeFunctional = true,
      includeWebhook = true,
      includeSecurity = true,
      includeAnalytics = true,
      verbose = false
    } = body;
    
    const masterSuite = new MasterTestSuite();
    const report = await masterSuite.runAllTests({
      includeFunctional,
      includeWebhook,
      includeSecurity,
      includeAnalytics,
      verbose
    });
    
    return NextResponse.json({
      success: true,
      report,
      configuration: {
        includeFunctional,
        includeWebhook,
        includeSecurity,
        includeAnalytics,
        verbose
      }
    });
    
  } catch (error) {
    console.error('❌ Custom test execution failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Custom test execution failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}